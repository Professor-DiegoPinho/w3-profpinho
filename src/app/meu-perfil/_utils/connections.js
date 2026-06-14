import { formatDateToPtBr } from './date';

export function buildConnectedAccounts(providerConnections, availableProviders) {
  const providers = [
    {
      key: 'google',
      label: 'Google',
      iconClassName: 'profile-connection-icon--google',
      description: 'Login social com conta Google.',
      connection: providerConnections.google,
    },
    {
      key: 'github',
      label: 'GitHub',
      iconClassName: 'profile-connection-icon--github',
      description: 'Login social com conta GitHub.',
      connection: providerConnections.github,
    },
  ];

  return providers.map((providerItem) => {
    const providerConnection =
      providerItem.connection && typeof providerItem.connection === 'object'
        ? providerItem.connection
        : null;

    const isConnected =
      typeof providerConnection?.providerAccountId === 'string' &&
      providerConnection.providerAccountId.length > 0;

    return {
      key: providerItem.key,
      label: providerItem.label,
      iconClassName: providerItem.iconClassName,
      description: providerItem.description,
      isAvailable: Boolean(availableProviders[providerItem.key]),
      isConnected,
      connectedAtLabel: formatDateToPtBr(providerConnection?.connectedAt),
      lastLoginAtLabel: formatDateToPtBr(providerConnection?.lastLoginAt),
    };
  });
}