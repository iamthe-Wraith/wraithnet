# wraithnet
wraithnet

## Installing
Currently, this project uses [keytar](https://www.npmjs.com/package/keytar) to access the user's system keychain. Because this dependency uses  `libsecret`, you may need to install it before running `npm install`.

Depending on your distribution, you will need to run the following command:

- Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
- Red Hat-based: `sudo yum install libsecret-devel`
- Arch Linux: `sudo pacman -S libsecret`
