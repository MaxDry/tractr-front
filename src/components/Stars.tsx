import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

interface StarsProps {
  note: number;
}

const customRoundStars = (num: number) => {
  const decimalPart = num % 1;

  if (decimalPart < 0.3) {
    return Math.floor(num);
  } else if (decimalPart < 0.7) {
    return Math.floor(num) + 0.5;
  } else {
    return Math.ceil(num);
  }
};

const Stars: React.FC<StarsProps> = ({ note }) => {
  const completedStars = customRoundStars(note);
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < Math.floor(completedStars)) {
      return <StarIcon key={index} htmlColor="#faca14" />;
    } else if (index === Math.floor(completedStars) && !!(completedStars % 2)) {
      return <StarHalfIcon key={index} htmlColor="#faca14" />;
    } else {
      return <StarBorderIcon key={index} htmlColor="gray" />;
    }
  });

  return <div>{stars}</div>;
};

export default Stars;
