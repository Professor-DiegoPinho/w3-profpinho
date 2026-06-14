import React from 'react';
import * as Icons from '@/assets/icons'

export function getStatusIcon(status, className = "") {
  switch (status) {
    case "pending":
      return <Icons.Hourglass size={32} className={className} />;
    case "approved":
      return <Icons.Check size={32} className={className} />
    case "rejected":
      return <Icons.Denied size={32} className={className} />
    default:
      return <Icons.Circle size={32} className={className} />
  }
}

export function getStatusText(status) {
  switch (status) {
    case "pending":
      return "Em análise";
    case "approved":
      return "Aprovado";
    case "rejected":
      return "Reprovado";
    default:
      return "Em análise";
  }
}
