interface Props {
  line: number;
  col: number;
  chars: number;
}

export default function StatusBar({ line, col, chars }: Props) {
  return (
    <div className="flex justify-between px-4 py-1 text-xs border-t bg-gray-100">
      <div>
        Ln {line}, Col {col} | {chars} characters
      </div>

      <div className="flex gap-4">
        <span>Plain Text</span>
        <span>100%</span>
        <span>Windows (CRLF)</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
