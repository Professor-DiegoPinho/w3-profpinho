import { adminDb } from "@/lib/firebaseAdmin";
import "./usuarios.css";

export const dynamic = 'force-dynamic';

async function getUsers() {
  try {
    const usersSnapshot = await adminDb.collection("users").get();
    const users = [];

    for (const doc of usersSnapshot.docs) {
      const data = doc.data();
      users.push({
        userId: doc.id,
        name: data.name || "N/A",
        email: data.email || "N/A",
        createdAt: data.createdAt,
        lastLoginAt: data.lastLoginAt,
      });
    }

    return users.sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() ?? 0;
      const bTime = b.createdAt?.toMillis?.() ?? 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
}

function formatDate(timestamp) {
  if (!timestamp) return "—";
  let date;

  if (typeof timestamp?.toDate === "function") {
    date = timestamp.toDate();
  } else if (typeof timestamp === "string") {
    date = new Date(timestamp);
  } else {
    return "—";
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function UsuariosPage() {
  const users = await getUsers();

  return (
    <div className="admin-usuarios-container">
      <h1 className="admin-usuarios-title">Usuários</h1>

      <div className="admin-usuarios-table-wrapper">
        <table className="admin-usuarios-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Data de Criação</th>
              <th>Último Login</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{formatDate(user.lastLoginAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="admin-usuarios-empty-cell">
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="admin-usuarios-info">Total: {users.length} usuários</p>
    </div>
  );
}
