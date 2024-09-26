export type Props = {
  skills: string[];
};

export const SkillList = ({ skills }: Props) => (
  <ul className="line-clamp-6 text-balance">
    {skills.map((tag) => (
      <li key={tag} className="inline">
        {tag}
        <BulletDivider />
      </li>
    ))}
  </ul>
);

/** A bullet (•) divider that disappears at the end of a line */
export const BulletDivider = () => (
  <span
    className="bg-center bg-no-repeat tracking-[0.8em]"
    style={{ backgroundImage: `url(${bulletImage})` }}
  >
    {" "}
  </span>
);

const bulletImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwAAADsABataJCQAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMkMEa+wAAAAnSURBVBhXY/Dz89MA4sNA/B9Ka4AEYQIwfBgkiCwAxjhVopnppwEApxQqhnyQ+VkAAAAASUVORK5CYII=";
