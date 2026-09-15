"use client";

type Item = { link: string; text: string; image: string };
export default function FlowingMenu({ items, speed = 15, textColor = "#fff", bgColor = "#120f17", marqueeBgColor = "#fff", marqueeTextColor = "#120f17", borderColor = "#fff" }: { items: Item[]; speed?: number; textColor?: string; bgColor?: string; marqueeBgColor?: string; marqueeTextColor?: string; borderColor?: string }) {
  return <div className="flowing-menu" style={{ background: bgColor, color: textColor, ['--flow-speed' as string]: `${speed}s`, borderColor }}>
    {items.map((item) => <a href={item.link} key={item.text} className="flowing-menu-item"><span>{item.text}</span><span className="flowing-menu-marquee" style={{ background: marqueeBgColor, color: marqueeTextColor, backgroundImage: `url(${item.image})` }}><span>{item.text}</span><span>{item.text}</span></span></a>)}
  </div>;
}
