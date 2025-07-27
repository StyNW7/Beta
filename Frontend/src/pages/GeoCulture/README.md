# GeoCulture Image Quiz Game

This component has been updated from an audio-based language quiz to an image-based landmark quiz game.

## Changes Made

### 1. Quiz Data Structure
The quiz data now contains:
- `imageSrc`: URL to landmark images (using Wikipedia Commons for demo)
- `hint`: Descriptive hint about the location
- `correctAnswer`: Name of the location/region
- `description`: Educational information about the landmark
- `coordinates`: Exact lat/lng coordinates for the correct answer

### 2. Game Mechanics
- Users see an image of a famous Indonesian landmark
- They must click on the map to guess where the landmark is located
- The game calculates the distance between their guess and the correct location
- If they're within 5km, it's considered correct

### 3. UI Changes
- Removed audio player and replaced with image display
- Changed "Language Quiz" to "Landmark Quiz"
- Updated question text from "Where is this speaker from?" to "Where is this landmark located?"
- Replaced translation section with hints
- Updated result text to show landmark location

### 4. Sample Questions Include
1. Jam Gadang Clock Tower (Bukittinggi, West Sumatra)
2. Tanah Lot Temple (Bali)
3. Monas National Monument (Jakarta)
4. Borobudur Temple (Central Java)
5. Lake Toba (North Sumatra)

## How to Use

1. Click "See Question" to view the current landmark image and hint
2. Study the image and read the hint
3. Click on the map where you think the landmark is located
4. Click "Guess" to submit your answer
5. View the result showing your accuracy and learn about the landmark
6. Click "Next Question" to continue

## Adding Custom Images

To use local images instead of Wikipedia links:
1. Add image files to `public/images/` folder
2. Update the `imageSrc` paths in the quiz data to use local paths like `/images/your-image.jpg`
3. Update coordinates to match your chosen landmarks

## Customization

- Adjust the accuracy threshold (currently 5km) in the `handleButtonClick` function
- Add more questions by expanding the `quiz` array
- Modify the map center and zoom level for different regions
- Update the scoring system or add difficulty levels
