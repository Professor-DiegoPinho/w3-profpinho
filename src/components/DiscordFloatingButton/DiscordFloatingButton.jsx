import Link from 'next/link';
import './DiscordFloatingButton.css';

const DISCORD_INVITE_LINK = '#';

export default function DiscordFloatingButton() {
  return (
    <div className="discord-floating-button-wrapper">
      <Link
        href={DISCORD_INVITE_LINK}
        className="discord-floating-button"
        title="Junte-se ao nosso servidor do Discord"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/images/discord_logo.png"
          alt="Discord"
          className="discord-button-icon"
        />
      </Link>
    </div>
  );
}
