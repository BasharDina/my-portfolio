type Props = {
  id?: string;
  title?: string;
  children: React.ReactNode;
};

export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        {title ? <h2 className="text-3xl font-bold">{title}</h2> : null}
        <div className={title ? "mt-6" : ""}>{children}</div>
      </div>
    </section>
  );
}