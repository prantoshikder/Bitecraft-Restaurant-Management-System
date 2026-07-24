"use client";

import "@ant-design/v5-patch-for-react-19";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider, theme } from "antd";

const brand = "#8cb33f";

export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: brand,
            colorInfo: brand,
            colorSuccess: "#4caf50",
            colorLink: brand,
            borderRadius: 10,
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            controlHeight: 38,
          },
          components: {
            Layout: {
              bodyBg: "#f6f7f3",
              headerBg: "#ffffff",
              siderBg: "#12160f",
            },
            Menu: {
              darkItemBg: "#12160f",
              darkSubMenuItemBg: "#0e1210",
              darkItemSelectedBg: brand,
              darkItemHoverBg: "rgba(140,179,63,0.16)",
              darkItemColor: "rgba(255,255,255,0.62)",
              itemBorderRadius: 10,
              itemMarginInline: 10,
            },
            Table: {
              headerBg: "#f4f6ef",
              headerColor: "#5c6551",
              rowHoverBg: "#f7f9f2",
              borderColor: "#eceee7",
            },
            Card: { borderRadiusLG: 16 },
            Button: { fontWeight: 600 },
            Statistic: { titleFontSize: 13 },
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </AntdRegistry>
  );
}
