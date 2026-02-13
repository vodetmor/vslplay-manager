import React from "react";

declare global {
    namespace React {
        namespace JSX {
            interface IntrinsicElements {
                "vslplay-player": React.DetailedHTMLProps<
                    React.HTMLAttributes<HTMLElement> & { id?: string; vid?: string },
                    HTMLElement
                >;
            }
        }
    }
}

export { };
