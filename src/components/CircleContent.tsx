import { motion } from "framer-motion";
import { CircleData } from "@/data/circleData";

interface CircleContentProps {
  circle: CircleData;
  isMobile?: boolean;
  isOlympic?: boolean;
}

const CircleContent = ({ circle, isMobile = false, isOlympic = false }: CircleContentProps) => {
  const Icon = circle.icon;

  const textBlurGlow = isOlympic ? {
    textShadow: '0 0 12px rgba(255, 255, 255, 0.4)',
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 8 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: isMobile ? 0.25 : 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }}
      className="relative w-full flex flex-col items-center justify-start p-6 md:p-12 pb-20"
      style={{
        willChange: 'opacity, transform',
        WebkitTransform: 'translate3d(0, 0, 0)'
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: isMobile ? 0.98 : 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: isMobile ? 0.08 : 0.1,
          duration: isMobile ? 0.2 : 0.25,
          ease: [0.4, 0.0, 0.2, 1]
        }}
        className="text-center mt-12 md:mt-8 mb-6"
        style={{
          willChange: 'opacity, transform',
          WebkitTransform: 'translate3d(0, 0, 0)'
        }}
      >
        <div
          className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4 rounded-full ${isOlympic ? "border border-primary/40 bg-primary/10" : "neu-circle"
            }`}
          style={isOlympic ? {
            boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.2)'
          } : {}}
        >
          <div style={isOlympic ? { filter: 'drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.5))' } : {}}>
            <Icon
              className={`w-8 h-8 md:w-10 md:h-10 ${isOlympic ? "text-primary brightness-125" : "text-primary"}`}
            />
          </div>
        </div>
        <h2
          className={`text-xl md:text-2xl font-semibold mb-2 ${isOlympic ? "text-white" : "text-foreground"}`}
          style={textBlurGlow}
        >
          {circle.content.title}
        </h2>
        <p
          className={`text-sm md:text-base max-w-md mx-auto ${isOlympic ? "text-white/70" : "text-muted-foreground"}`}
          style={isOlympic ? { textShadow: '0 0 8px rgba(255, 255, 255, 0.2)' } : {}}
        >
          {circle.content.description}
        </p>
      </motion.div>

      {/* Content Grid */}
      {circle.content.items && (
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 12 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: isMobile ? 0.15 : 0.2,
            duration: isMobile ? 0.25 : 0.3,
            ease: [0.4, 0.0, 0.2, 1]
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full max-w-lg"
          style={{
            willChange: 'opacity, transform',
            WebkitTransform: 'translate3d(0, 0, 0)'
          }}
        >
          {circle.content.items.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: isMobile ? 6 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: isMobile ? 0.2 + index * 0.03 : 0.25 + index * 0.05,
                  duration: isMobile ? 0.15 : 0.2,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                className={`flex items-start gap-3 p-4 rounded-xl ${isOlympic ? "border border-white/10 bg-white/5" : "neu-tile"
                  }`}
                style={{
                  willChange: 'opacity, transform',
                  WebkitTransform: 'translate3d(0, 0, 0)'
                }}
              >
                {ItemIcon && (
                  <div className={`w-10 h-10 flex items-center justify-center shrink-0 rounded-lg ${isOlympic ? "bg-primary/10" : "neu-circle-pressed"
                    }`}>
                    <div style={isOlympic ? { filter: 'drop-shadow(0 0 5px rgba(var(--primary-rgb), 0.4))' } : {}}>
                      <ItemIcon
                        className={`w-5 h-5 ${isOlympic ? "text-primary brightness-110" : "text-primary"}`}
                      />
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium text-sm md:text-base truncate ${isOlympic ? "text-white" : "text-foreground"}`}
                    style={isOlympic ? { textShadow: '0 0 8px rgba(255, 255, 255, 0.3)' } : {}}
                  >
                    {item.label}
                  </p>
                  {item.description && (
                    <p
                      className={`text-xs md:text-sm mt-0.5 ${isOlympic ? "text-white/60" : "text-muted-foreground"}`}
                      style={isOlympic ? { textShadow: '0 0 5px rgba(255, 255, 255, 0.2)' } : {}}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CircleContent;
