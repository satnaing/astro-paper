import Datetime from "./Datetime";
import type { Frontmatter } from "@utils/types";

export interface Props {
  href?: string;
  post: Frontmatter;
}

export default function Card({ href, post }: Props) {
  return (
    <li className="my-6">
      <a
        href={href}
        className="text-skin-accent font-medium text-lg underline-offset-4 decoration-dashed focus-visible:underline"
      >
        <h2 className="font-medium text-lg decoration-dashed hover:underline">
          {post.title}
        </h2>
      </a>
      <Datetime datetime={post.datetime} />
      <p>{post.description}</p>
    </li>
  );
}
