export declare global {
  interface Window {
    route(event: Event): void;
  }
  interface EventTarget {
    href: string | URL;
  }
}
