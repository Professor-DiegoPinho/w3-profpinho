#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Uso: $0 <pasta_das_aulas> <numero_da_aula>"
  echo "Exemplo: $0 ../content/html 16"
  exit 1
fi

lesson_dir="$1"
removed_number_raw="$2"

if [[ ! -d "$lesson_dir" ]]; then
  echo "Pasta não encontrada: $lesson_dir"
  exit 1
fi

if [[ ! "$removed_number_raw" =~ ^[0-9]+$ ]]; then
  echo "O número da aula deve ser um inteiro positivo."
  exit 1
fi

removed_number=$((10#$removed_number_raw))

shopt -s nullglob

files=( "$lesson_dir"/*.md )

if [[ ${#files[@]} -eq 0 ]]; then
  echo "Nenhum arquivo .md encontrado na pasta: $lesson_dir"
  exit 1
fi

target_path=""
target_base=""

sortable_lines=()

for file_path in "${files[@]}"; do
  base="$(basename "$file_path")"

  if [[ "$base" =~ ^([0-9]+)-(.+)\.md$ ]]; then
    num_str="${BASH_REMATCH[1]}"
    slug="${BASH_REMATCH[2]}"
    num=$((10#$num_str))

    sortable_lines+=("${num}|${num_str}|${slug}|${file_path}")

    if (( num == removed_number )); then
      target_path="$file_path"
      target_base="$base"
    fi
  fi
done

if [[ -z "$target_path" ]]; then
  echo "Nenhuma aula encontrada com número: $removed_number"
  exit 1
fi

echo "Removendo: $target_base"
rm -- "$target_path"

IFS=$'\n' sorted_lines=($(printf '%s\n' "${sortable_lines[@]}" | sort -t'|' -k1,1n))
unset IFS

update_order() {
  local file="$1"
  local new_order="$2"
  local tmp_file
  tmp_file="$(mktemp)"

  awk -v new_order="$new_order" '
    BEGIN { updated = 0 }
    {
      if (!updated && $0 ~ /^[[:space:]]*order:[[:space:]]*[0-9]+[[:space:]]*$/) {
        print "order: " new_order
        updated = 1
      } else {
        print
      }
    }
  ' "$file" > "$tmp_file"

  mv -- "$tmp_file" "$file"
}

for line in "${sorted_lines[@]}"; do
  IFS='|' read -r num num_str slug old_path <<< "$line"
  unset IFS

  if (( num > removed_number )); then
    width="${#num_str}"
    new_num=$((num - 1))
    new_num_str="$(printf "%0${width}d" "$new_num")"
    new_base="${new_num_str}-${slug}.md"
    new_path="$lesson_dir/$new_base"

    echo "Renomeando: $(basename "$old_path") -> $new_base"
    mv -- "$old_path" "$new_path"

    echo "Atualizando order para: $new_num em $new_base"
    update_order "$new_path" "$new_num"
  fi
done

echo "Concluído."