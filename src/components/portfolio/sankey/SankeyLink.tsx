import React from "react";

import { SankeyLink as SankeyLinkType, sankeyLinkHorizontal } from "d3-sankey";
import { SankeyDataLink, SankeyDataNode } from "./data";

export type PathLink = SankeyLinkType<SankeyDataNode, SankeyDataLink>;

const makeDPath = sankeyLinkHorizontal<SankeyDataNode, SankeyDataLink>();

interface SankeyLinkProps {
  d: string;
  strokeWidth?: number;
  color?: string;
  title?: string;
}

export const SankeyLink = ({
  d,
  color,
  strokeWidth,
  title
}: SankeyLinkProps): JSX.Element => {
  return (
    <g style={{ mixBlendMode: "multiply" }}>
      <path d={d} stroke={color} strokeWidth={strokeWidth}>
        {title && <title>{title}</title>}
      </path>
    </g>
  );
};

interface SankeyLinksProps {
  links: PathLink[];
  titleFunc?(link: PathLink): string;
  colorFunc?(link: PathLink): string;
}

export const SankeyLinks = ({
  links,
  titleFunc,
  colorFunc
}: SankeyLinksProps): JSX.Element => {
  return (
    <g fill="none" strokeOpacity={0.5}>
      {links.map((link) => {
        const d = makeDPath(link);

        if (!d) return null;

        const strokeWidth = Math.max(1, link.width || 0);

        const { source, target } = link;
        const key =
          (typeof source === "object" ? source.name : source) +
          "--" +
          (typeof target === "object" ? target.name : target);

        return (
          <SankeyLink
            key={key}
            d={d}
            color={colorFunc?.(link)}
            title={titleFunc?.(link)}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </g>
  );
};
