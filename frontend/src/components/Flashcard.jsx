import React, { useState } from 'react';

const Flashcard = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="w-full h-64 perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
            >
                {/* Front of the card */}
                <div className="absolute w-full h-full backface-hidden bg-white border-2 border-blue-300 rounded-lg shadow-lg flex items-center justify-center p-4">
                    <p className="text-xl font-semibold text-center">{question}</p>
                </div>
                {/* Back of the card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-blue-100 border-2 border-blue-300 rounded-lg shadow-lg flex items-center justify-center p-4">
                    <p className="text-lg text-center">{answer}</p>
                </div>
            </div>
        </div>
    );
};

// Add this CSS to your App.css or index.css for the 3D effect
/*
.perspective-1000 { perspective: 1000px; }
.transform-style-preserve-3d { transform-style: preserve-3d; }
.rotate-y-180 { transform: rotateY(180deg); }
.backface-hidden { backface-visibility: hidden; }
*/

export default Flashcard;