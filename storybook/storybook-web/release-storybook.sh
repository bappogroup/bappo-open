# Upgrade bappo-components version in storybook
yarn upgrade bappo-components --latest
yarn --cwd ../storybook-native upgrade bappo-components --latest
git add -A
git commit -m "Upgrade bappo-components in storybook"
git push origin

# Build storybook
yarn build

# Deploy storybook in another branch
git checkout gh-pages
rm -rf ../../storybook-web
mv dist ../../storybook-web
git add -A
git commit -m "Storybook deploy"
git push origin gh-pages

# Back to master
git checkout -
