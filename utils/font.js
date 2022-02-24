export const preloadFont = (font, types) => {
    return types.map((type) => {
        return (
            <link
                key={font + type}
                rel='preload'
                as='font'
                crossOrigin=''
                href={`fonts/${font}/${font}-${type}.ttf`}
            />
        );
    });
};
