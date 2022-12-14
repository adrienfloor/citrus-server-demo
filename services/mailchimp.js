const mailchimp = require('@mailchimp/mailchimp_marketing')
const md5 = require("md5")
const Mailchimp = require('mailchimp-api-v3')

const {
	mailchimpApiKey,
	mailchimpListId
} = require('../config')

const mailchimpApi = new Mailchimp(mailchimpApiKey)

mailchimp.setConfig({
	apiKey: mailchimpApiKey,
	server: 'us2'
})

async function addAccountToAudience(firstName, lastName, email, language) {

	const response = await mailchimp.lists.addListMember(mailchimpListId, {
		email_address: email,
		status: 'subscribed',
		language,
		merge_fields: {
			FNAME: firstName,
			LNAME: lastName
		}
	})

	return response.id

}

async function updateMemberTag(email, tagName, tagStatus) {

	mailchimpApi.request({
		method: 'post',
		path: '/lists/{list_id}/members/{subscriber_hash}/tags',
		path_params: {
			list_id: mailchimpListId,
			subscriber_hash: md5(email.toLowerCase())
		},
		body: {
			tags: [{ name: tagName, status: tagStatus }]
		}
	})
	.then(function (result) {
		return result
	})
	.catch (function (err) {
		console.log('err', err)
		return err
	})

}

module.exports.addAccountToAudience = addAccountToAudience
module.exports.updateMemberTag = updateMemberTag