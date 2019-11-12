# Upgrade bappo-components version in storybook
yarn upgrade bappo-components --latest
yarn --cwd ../storybook-native upgrade bappo-components --latest

# Build storybook
yarn build

# Deploy storybook in another branch
rm -r ../../../../docs
cp -r dist ../../../../docs
git add -A
git commit -m "Storybook deploy"
git push origin
