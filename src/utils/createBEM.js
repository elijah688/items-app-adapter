export default (mainClass) => (className, modifiers) => {
  const coreStyle = className ? `${mainClass}__${className}` : mainClass;
  if (modifiers) {
    const styles = modifiers.map((mod) => `${mainClass}__${className}--${mod}`);
    styles.unshift(coreStyle);
    return styles.join(' ');
  }
  return coreStyle;
};
