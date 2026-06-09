import { formatDate } from "../../_utils/format";
import styles from "./UsersTable.module.css";

export function UsersTable({ users }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
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
              <td colSpan="4" className={styles.emptyCell}>
                Nenhum usuário encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
