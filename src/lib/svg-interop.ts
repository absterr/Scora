import * as AppIcons from "@/components/icons/app";
import * as Feature from "@/components/icons/feature";
import * as Flags from "@/components/icons/flags";
import * as LineIcons from "@/components/icons/line";
import * as SocialIcons from "@/components/icons/social";
import * as SolidIcons from "@/components/icons/solid";
import { cssInterop } from "nativewind";

[
  ...Object.values(AppIcons),
  ...Object.values(Feature),
  ...Object.values(Flags),
  ...Object.values(LineIcons),
  ...Object.values(SocialIcons),
  ...Object.values(SolidIcons),
].forEach((Icon) => {
  cssInterop(Icon as any, {
    className: { target: "style", nativeStyleToProp: { color: true } },
  });
});
