declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const SvgIcon: FC<SVGProps<SVGSVGElement>>;
  export default SvgIcon;
}
