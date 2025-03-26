const SectionHeader = ({ badge, title, description, className = "", delay = 0 }) => {
  return (
    <div className={`max-w-xl mx-auto text-center mb-20 ${className}`} data-aos="fade-up" data-aos-delay={delay}>
      {badge && <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">{badge}</span>}

      <h2 className="text-3xl md:text-4xl font-bold mb-6 relative">
        <span className="relative z-10">{title}</span>
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 w-16 bg-primary/40 rounded-full"></span>
      </h2>

      {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
    </div>
  );
};

export default SectionHeader;
