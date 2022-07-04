import sha1 from 'js-sha1'


const AnimalIdenticon = (username) => {
    const toSvg = (_size = 128) => {
        const size = _size

        const digits = generateDigits()
        const icon   = generateIcon(digits)
        const color  = generateColor(digits)

        const svg = `<svg style="background-color: #${color}; height: ${size}px; width: ${size}px">
                        <image xlink:href="https://ssl.gstatic.com/docs/common/profile/${icon}_lg.png" style="height: ${size}px; width: ${size}px"></image>
                        </svg>`

        return svg
    }
    
    const generateDigits = () => {
        return parseInt(sha1(username).slice(-3), 16)
    }
    
    const generateIcon = (digits) => {
        const animalNumber = digits % 59
        const animals = [
            'alligator', 'auroch', 'beaver', 'buffalo', 'camel', 'capybara',
            'chameleon', 'chinchilla', 'chipmunk', 'cormorant', 'crow', 'dingo', 'dolphin',
            'duck', 'elephant', 'ferret', 'fox', 'giraffe', 'gopher', 'grizzly', 'hippo', 'hyena',
            'iguana', 'kangaroo', 'koala', 'kraken', 'lemur', 'liger', 'llama', 'monkey', 'moose', 'narwhal', 'orangutan', 'otter', 'panda', 'penguin', 'pumpkin',
            'quagga', 'rabbit', 'raccoon', 'rhino', 'sheep', 'shrew', 'skunk', 'tiger', 'turtle',
            'walrus', 'wolf', 'wombat'
        ]

        return animals[animalNumber]
    }
    
    const generateColor = (digits) => {
        const colorNumber = Math.floor(digits / 64)
        const colors = [
            '721acb', '841acb', '931acb', 'a51acb', 'b41acb', 'c51acb', 'cb1abf', 'cb1ab1', 'cb1a9f', 'cb1a8d',
            'cb1a7e', 'cb1a6c', 'cb1a5e', 'cb1a4c', 'cb1a3a', 'cb1a2b', 'cb1a1a', 'cb2b1a', 'cb3a1a', 'cb4c1a',
            'cb5e1a', 'cb6c1a', 'cb7e1a', 'cb8d1a', 'cb9f1a', 'cbb11a', 'cbbf1a', 'c5cb1a', 'b4cb1a', 'a5cb1a',
            '93cb1a', '84cb1a', '72cb1a', '61cb1a', '52cb1a', '40cb1a', '31cb1a', '1fcb1a', '1acb25', '1acb34',
            '1acb46', '1acb58', '1acb67', '1acb78', '1acb87', '1acb99', '1acbab', '1acbb9', '1acbcb', '1ab9cb',
            '1aabcb', '1a99cb', '1a87cb', '1a78cb', '1a67cb', '1a58cb', '1a46cb', '1a34cb', '1a25cb', '1f1acb',
            '311acb', '401acb', '521acb', '611acb'
        ]

        return colors[colorNumber]
    }

    return toSvg()
} // ALL CREDIT GOES TO @camelmasa on github! I reconfigured this library to be function based

export default AnimalIdenticon