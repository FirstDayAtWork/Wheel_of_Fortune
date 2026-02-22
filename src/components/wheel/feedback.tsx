type FeedBackProps = {
  feedback: string;
};

export default function FeedBack(props: FeedBackProps) {
  const { feedback } = props;

  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {feedback}
    </h2>
  );
}
