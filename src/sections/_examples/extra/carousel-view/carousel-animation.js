import PropTypes from "prop-types";
import { m } from "framer-motion";
// @mui
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
// theme
import { bgGradient } from "src/theme/css";
// components
import Image from "src/components/image";
import { MotionContainer, varFade } from "src/components/animate";
import Carousel, {
  CarouselArrowIndex,
  useCarousel,
} from "src/components/carousel";
import { paths } from "src/routes/paths";
import { useRouter } from "next/navigation";


export default function CarouselAnimation({ data }) {
  

  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
  });

  return (
    <Card>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {data.map((item, index) => (
          <CarouselItem
            key={item.slug}
            item={item}
            active={index === carousel.currentIndex}
          />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={carousel.currentIndex}
        total={data.length}
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      />
    </Card>
  );
}

CarouselAnimation.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item, active }) {

  const { push } = useRouter();

  const theme = useTheme();

  const { coverUrl, title } = item;

  const variants =
    theme.direction === "rtl" ? varFade().inLeft : varFade().inRight;

  return (
    <Paper sx={{ position: "relative" }}>
      <Image
        dir="ltr"
        alt={title}
        src={
          coverUrl !== null && coverUrl !== undefined
            ? coverUrl
            : "/assets/images/sample_recipe_cover.png"
        }
        ratio="16/9"
      />

      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          position: "absolute",
          ...bgGradient({
            direction: "to top",
            startColor: `${theme.palette.grey[900]} 0%`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
          }),
        }}
      />

      <CardContent
        component={MotionContainer}
        animate={active}
        action
        sx={{
          left: 0,
          bottom: 0,
          maxWidth: 720,
          textAlign: "left",
          position: "absolute",
          color: "common.white",
        }}
      >
        <Typography variant="overline" gutterBottom>
          Featured Recipe
        </Typography>
        <m.div variants={variants}>
          <Typography variant="h3" gutterBottom>
            {item.title}
          </Typography>
        </m.div>

        <m.div variants={variants}>
          <Typography variant="body2" noWrap gutterBottom>
            {item.excerpt}
          </Typography>
        </m.div>

        <m.div variants={variants}>
          <Button
            onClick={() => push(paths.recipe(item.slug))}
            variant="contained"
            sx={{ mt: 3, mb: 3, backgroundColor: "#02D87E" }}
          >
            Read More
          </Button>
        </m.div>
      </CardContent>
    </Paper>
  );
}

CarouselItem.propTypes = {
  active: PropTypes.bool,
  item: PropTypes.object,
};
