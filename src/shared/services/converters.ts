const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export const convertUTCtoUserDate = (dateUTC: Date) => {

    return new Date(dateUTC).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: userTimeZone
    })
}

export const convertUTCtoUserDateTime = (dateUTC: Date) => {

    return new Date(dateUTC).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: userTimeZone
    })
}