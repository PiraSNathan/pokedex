interface Props {
  value: number;
  colour?: string;
}

const BarChart = (props: Props) => {
  return (
    <div className="h-4 border-[#6f6d708f] border border-1 rounded-md w-[200px]">
      <div
        style={{
          width: `${props.value > 100 ? 100 : props.value}%`,
          backgroundColor: `${props.colour}`,
        }}
        className={`h-full rounded-md ${!props.colour && "bg-blue-500"}`}
      >
      </div>
    </div>
  );
};

export default BarChart;
