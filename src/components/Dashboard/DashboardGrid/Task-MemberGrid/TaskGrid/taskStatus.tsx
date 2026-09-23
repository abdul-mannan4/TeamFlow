import React from "react";

type TaskStatusProps = {
  percentage: number;
  status: string;
  textColor: string;
  bgColor: string;
};

export default function TaskStatus({
  percentage,
  status,
  textColor,
  bgColor,
}: TaskStatusProps) {
  return (
    <div className={`${bgColor} rounded-xl p-3.5 2xl:p-4.5`}>
      <p className={`text-[26px] 2xl:text-[32px] font-bold ${textColor}`}>
        {percentage}
      </p>

      <p className={`text-[16px] 2xl:text-[18px] font-semibold mt-0.5 ${textColor}`}>
        {status}
      </p>
    </div>
  );
}