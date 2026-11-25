import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { EventItem } from "./eventData";
import styles from "./EventGallery.module.scss";

interface EventCardProps {
  event: EventItem;
  onClick?: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = () => {
    if (onClick) {
      onClick(event);
    } else if (event.link) {
      window.location.href = event.link;
    }
  };

  return (
    <motion.div
      className={styles.cardMotionWrapper}
      whileHover={shouldReduceMotion ? {} : { y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card
        component="article"
        elevation={0}
        className={styles.eventCard}
        onClick={handleClick}
        tabIndex={0}
        role="group"
        aria-label={`${event.title} - ${event.category}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        sx={{
          bgcolor: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #eaecf0",
          boxShadow: "none",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          height: "100%",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            borderColor: "#F39200",
            boxShadow: "0 8px 24px rgba(17, 17, 17, 0.06)",
          },
        }}
      >
        {/* Consistent Image Container */}
        <Box
          className={styles.imageContainer}
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: { xs: 145, sm: 175, md: 200 },
          }}
        >
          <CardMedia
            component="img"
            image={event.image}
            alt={event.alt || event.title}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.4s ease",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          />
        </Box>

        {/* Card Content & Details */}
        <CardContent
          sx={{
            p: { xs: "12px 14px", sm: "16px 18px" },
            "&:last-child": { pb: { xs: "12px", sm: "16px" } },
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          {/* Metadata: Category & Date */}
          <Box sx={{ mb: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                mb: 0.75,
              }}
            >
              <Typography
                variant="caption"
                component="span"
                sx={{
                  color: "#F39200",
                  fontWeight: 700,
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {event.category}
              </Typography>
              <Typography
                variant="caption"
                component="span"
                sx={{
                  color: "#555555",
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                  fontWeight: 500,
                }}
              >
                {event.date}
              </Typography>
            </Box>

            {/* Event Title */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontSize: { xs: "0.98rem", sm: "1.1rem" },
                fontWeight: 700,
                color: "#111111",
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {event.title}
            </Typography>
          </Box>

          {/* Action Row with circular arrow */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              mt: "auto",
              pt: 0.5,
            }}
          >
            <IconButton
              size="small"
              aria-label={`Learn more about ${event.title}`}
              className={styles.cardActionBtn}
              sx={{
                width: { xs: 32, sm: 36 },
                height: { xs: 32, sm: 36 },
                borderRadius: "50%",
                border: "1px solid #e2e8f0",
                bgcolor: "#f8fafc",
                color: "#111111",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#F39200",
                  borderColor: "#F39200",
                  color: "#ffffff",
                  transform: "translate(2px, -2px)",
                },
              }}
            >
              <ArrowUpRight size={16} />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventCard;
