export function suggestTemplates(eventType: string, preferences?: any) {
  const suggestions = {
    "boda": ["elegant-dark", "minimal-white", "floral-spring"],
    "15anos": ["neon-party", "princess-pink", "glamour-gold"],
    "bautismo": ["baby-blue", "pure-white", "soft-pastel"],
    "cumpleanos": ["fun-colorful", "classic-black", "retro-disco"],
    "corporativo": ["modern-corporate", "clean-business", "tech-blue"]
  };

  const defaultTemplates = ["minimal-white"];
  return suggestions[eventType as keyof typeof suggestions] || defaultTemplates;
}
