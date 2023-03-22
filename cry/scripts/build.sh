# Build the website files
# Should be run with "npm run build" - npm handles the pathing better (so no "#!/usr/bin/env" bash on top)

# encrypt the example file
npx . example/example.html test \
    --no-embed \
    --salt b93bbaf35459951c47721d1f3eaeb5b9 \
    --instructions "Enter \"test\" to unlock the page"

# build the index.html file
node ./scripts/buildIndex.js
