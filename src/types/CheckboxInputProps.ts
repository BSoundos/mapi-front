export interface CheckboxInputProps {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled:boolean;
  }