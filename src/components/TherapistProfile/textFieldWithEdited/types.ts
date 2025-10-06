export interface Props {
  value: string | number | undefined;
  dataType: "fullName" | "hourlyRate" | "major";
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | number) => void;
  isProfileOwner: boolean;
  themeMode: string;
}
