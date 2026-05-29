import { Icon } from "@/assets/icons/Icon";

export function Admin({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M12 2L4 5V11C4 16.55 8.07 21.2 12 22.97C15.93 21.2 20 16.55 20 11V5L12 2Z"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 10V14"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 11H15"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
}

export function Approved({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <circle cx="12" cy="12" r="10" fill="#2e7d32" opacity="0.15" />
      <path
        d="M7 12.5L10.5 16L17 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ArrowLeft({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="m313-440 196 196q12 12 11.5 28T508-188q-12 11-28 11.5T452-188L188-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l264-264q11-11 27.5-11t28.5 11q12 12 12 28.5T508-715L313-520h447q17 0 28.5 11.5T800-480q0 17-11.5 28.5T760-440H313Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export function ArrowRight({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ClosedBook({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path d="M240-347q14-7 29-10t31-3h20v-440h-20q-25 0-42.5 17.5T240-740v393Zm160-13h320v-440H400v440Zm-160 13v-453 453Zm60 267q-58 0-99-41t-41-99v-520q0-58 41-99t99-41h420q33 0 56.5 23.5T800-800v501q0 8-6.5 14.5T770-270q-14 7-22 20t-8 30q0 17 8 30.5t22 19.5q14 6 22 16.5t8 22.5v10q0 17-11.5 29T760-80H300Zm0-80h373q-6-14-9.5-28.5T660-220q0-16 3-31t10-29H300q-26 0-43 17.5T240-220q0 26 17 43t43 17Z" />
    </Icon>
  );
}

export function OpenBook({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path d="M270-80q-45 0-77.5-30.5T160-186v-558q0-38 23.5-68t61.5-38l300-59q37-8 66 16t29 62v477q0 29-18 51.5T576-275l-315 63q-9 2-15 9.5t-6 16.5q0 11 9 18.5t21 7.5h450v-600q0-17 11.5-28.5T760-800q17 0 28.5 11.5T800-760v600q0 33-23.5 56.5T720-80H270Zm90-233 200-39v-478l-200 39v478Zm-80 16v-478l-15 3q-11 2-18 9.5t-7 18.5v457q5-2 10.5-3.5T261-293l19-4Zm-40-475v485-485Z" />
    </Icon>
  );
}

export function Book({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M8.5 6.5A2.5 2.5 0 0 1 11 4h7.5v14H11A2.5 2.5 0 0 0 8.5 20V6.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 6.5H5.5V20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function Checkmark({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <path
        d="M7 12.5L10.5 16L17 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function Close({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function Copy({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export function Courses({ size, className }) {
  return (
    <Icon size={size} viewBox="0 -960 960 960" className={className}>
      <path
        d="M840-324v-240L512-400q-15 8-32 8t-32-8L112-568q-10-5-15-13.5T92-600q0-10 5-18.5t15-13.5l336-168q8-4 16-6t16-2q8 0 16 2t16 6l380 190q9 5 14.5 13t5.5 19v254q0 15-10.5 25.5T876-288q-15 0-25.5-10.5T840-324ZM448-160l-192-96q-18-9-29-26.5T216-320v-115l232 116q15 8 32 8t32-8l232-116v115q0 20-11 37.5T704-256l-192 96q-8 4-16 6t-16 2q-8 0-16-2t-16-6Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export function Download({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM160-160v-200h80v120h480v-120h80v200H160Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export function Edit({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export function Evaluate({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <polyline
        points="12 6 12 12 16 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ExternalLink({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="15 3 21 3 21 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="10"
        y1="14"
        x2="21"
        y2="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function Github({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.759 5.556 17.912 5.556 17.912C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.153C5.455 7.85 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C10.938 5.675 13.062 5.675 15.003 6.207C17.294 4.655 18.3 4.977 18.3 4.977C18.953 6.63 18.542 7.851 18.418 8.153C19.188 8.993 19.653 10.064 19.653 11.374C19.653 15.983 16.846 16.998 14.174 17.295C14.604 17.667 14.997 18.397 14.997 19.517V22.81C14.997 23.129 15.189 23.504 15.798 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export function Google({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
        fill="#4285F4"
      />
      <path
        d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.14 18.63 6.71 16.7 5.84 14.1H2.18V16.94C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.07H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.93L5.03 14.71L5.84 14.09Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.18 7.07L5.84 9.91C6.71 7.31 9.14 5.38 12 5.38Z"
        fill="#EA4335"
      />
    </Icon>
  );
}

export function Minus({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M7 12h10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function Plus({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M12 7v10M7 12h10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function Rejected({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <circle cx="12" cy="12" r="10" fill="#d32f2f" opacity="0.15" />
      <path
        d="M8 8L16 16M16 8L8 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function Resumes({ size, className }) {
  return (
    <Icon size={size} viewBox="0 -960 960 960" className={className}>
      <path
        d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-160h200q17 0 28.5-11.5T560-320q0-17-11.5-28.5T520-360H320q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160h320q17 0 28.5-11.5T680-480q0-17-11.5-28.5T640-520H320q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160h320q17 0 28.5-11.5T680-640q0-17-11.5-28.5T640-680H320q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export function Tutorials({ size, className }) {
  return (
    <Icon size={size} viewBox="0 -960 960 960" className={className}>
      <path
        d="M40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q74 0 126 17t112 52q11 6 16.5 14t5.5 21v418q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-441q0-17 11.5-28.5T880-777q17 0 28.5 11.5T920-737v503q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-49 0-95.5 14.5T516-185q-8 5-17.5 7.5T480-175q-9 0-18.5-2.5T444-185q-42-26-88.5-40.5T260-240q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234Zm580-208v-369q0-13 7.5-23.5T647-849l54-18q14-5 26.5 4.5T740-838v369q0 13-7.5 23.5T713-431l-54 18q-14 5-26.5-4.5T620-442Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export function User({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M12 12A4 4 0 1 0 12 4A4 4 0 0 0 12 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 20A7 7 0 0 1 19 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
