export default function colorize(value, colorScheme) {
    if (value <= colorScheme[0]) {
        return colorScheme[1];
    }

    for (let i = 0; i < colorScheme.length; i += 2) {
        const threshold = colorScheme[i];
        if (value < threshold) {
            return colorScheme[i - 1];
        }
    }

    return colorScheme[colorScheme.length - 1];
}