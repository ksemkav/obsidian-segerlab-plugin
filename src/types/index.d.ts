declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const SvgIcon: FC<SVGProps<SVGSVGElement>>;
  export default SvgIcon;
}

declare module '*.svg?raw' {
  const content: string;
  export default content;
}
