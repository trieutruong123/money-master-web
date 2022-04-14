import { csv } from "d3-fetch";

export interface SankeyDataLink {
  source: string;
  target: string;
  value: number;
}

export interface SankeyDataNode {
  name: string;
  category: string;
}

export interface SankeyData {
  nodes: SankeyDataNode[];
  links: SankeyDataLink[];
}

type RawLink = Partial<Record<keyof SankeyDataLink, string>>;

const isFullLink = (rawLink: RawLink): rawLink is Required<RawLink> => {
  return !!(rawLink.source && rawLink.target && rawLink.value);
};

export const getData = async (): Promise<SankeyData> => {
  //format of input:
  // {
  //   source: <category>@@<name>
  //   target: <category>@@<name>
  //   value: number
  // }


  const rawLinks:RawLink[]=[
    {
      source:'Bank@@ABC Bank',
      target:'Crypto@@Bitcoin',
      value:'100'
    },
    {
      source:'Bank@@ABC Bank',
      target:'Forex@@USD',
      value:'80'
    },
    {
      source:'Bank@@ABC Bank',
      target:'Bank@@Vietcombank',
      value:'80'
    },
    {
      source:'Crypto@@Bitcoin',
      target:'Crypto@@Ethenum',
      value:'80'
    },
    
  ]

  const links: SankeyDataLink[] = rawLinks.filter(isFullLink).map((link) => ({
    ...link,
    value: +link.value
  }));

  console.log("links", links);

  function* picker(): Generator<string> {
    for (const { source, target } of links) {
      if (source) yield source;
      if (target) yield target;
    }
  }

  const uniqueNodeNames = new Set<string>(picker());
  console.log(uniqueNodeNames);
  const nodes = Array.from(uniqueNodeNames, (name) => ({
    name:name,
    category: name.split('@@')[0],
  }));
  console.log("nodes", nodes);

  return { nodes, links };
};
