import React from "react";

type IconLikeProps = { size?: number; color?: string };

export function ButtonIcon({
  children,
  size = 18,
  color,
}: {
  children: React.ReactElement<IconLikeProps>;
  size?: number;
  color?: string;
}) {
  return React.cloneElement(children, {
    size,
    color: color ?? children.props.color,
  });
}
