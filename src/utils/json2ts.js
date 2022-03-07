import * as _ from 'underscore'

export class Json2Ts {
    tab = '  '

    isJson(stringContent) {
        try {
            JSON.parse(stringContent)
            return true
        } catch (e) {
            return false
        }
    }

    convert(content) {
        let jsonContent = JSON.parse(content)

        if (_.isArray(jsonContent)) {
            return this.convertObjectToInterfaces(jsonContent[0], '', 1) + '[]'
        }

        return this.convertObjectToInterfaces(jsonContent, '', 1)
    }

    convertObjectToInterfaces(jsonContent, result, level) {
        let optionKeys = []
        let objectResult = []
        let l = '{\n'
        for (let key in jsonContent) {
            let value = jsonContent[key]
            let res = this.tab.repeat(level)
            if (_.isObject(value) && !_.isArray(value)) {
                res += `${key}: ${this.convertObjectToInterfaces(
                    value,
                    '',
                    level + 1
                )}`
            } else if (_.isArray(value)) {
                let v = value[0]
                if (_.isObject(v)) {
                    res += `${key}: ${this.convertObjectToInterfaces(
                        v,
                        '',
                        level + 1
                    )}[]`
                } else if (_.isNumber(v)) {
                    res += `${key}: number[]`
                } else if (_.isString(v)) {
                    res += `${key}: string[]`
                } else if (_.isBoolean(v)) {
                    res += `${key}: boolean[]`
                } else {
                    res += `${key}: any[]`
                }
            } else if (_.isNumber(value)) {
                res += `${key}: number`
            } else if (_.isString(value)) {
                res += `${key}: string`
            } else if (_.isBoolean(value)) {
                res += `${key}: boolean`
            }

            l += res + '\n'
        }
        l += this.tab.repeat(level - 1) + '}'
        return l
    }
}
