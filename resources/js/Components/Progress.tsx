import ProgressBar from "@ramonak/react-progress-bar";

export default function ProgressBarComponent({ percentage }: { percentage: number }) {
  return (
    // <ProgressBar 
    // completed={percentage}
    // barContainerClassName="fileUploadedContainer"
    // completedClassName="fileUploadedBarCompleted"
    // labelClassName="fileUploadedbarLabel"
    // />
    <ProgressBar 
    height="17px"
    baseBgColor="#f3f4f6"
    bgColor="#ff9339"
    completed={percentage}
    />
  )
}
