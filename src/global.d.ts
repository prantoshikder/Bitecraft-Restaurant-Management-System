// Ambient declarations so side-effect style imports (e.g. `import "./globals.css")
// are recognised by the editor's TypeScript server. The Next.js bundler handles
// the actual CSS; these keep the IDE from flagging ts(2882).
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
