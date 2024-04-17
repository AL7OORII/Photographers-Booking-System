import { Button } from "../ui/button";

interface DisplayPhotographyStylesProps {
  styles: string[];
}
const DisplayPhotographyStyles: React.FC<DisplayPhotographyStylesProps> = ({
  styles,
}) => {
  return (
    <div className="border py-4 px-8 rounded-xl space-y-2 bg-light_blue/20">
      <h1 className="text-cream">Photography specialization</h1>
      <div className="flex gap-1 flex-wrap">
        {styles.map((style, i) => (
          <Button
            className="h-fit py-1 disabled:opacity-100 bg-dark_red text-cream capitalize"
            disabled
            key={i}
          >
            {style}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DisplayPhotographyStyles;
