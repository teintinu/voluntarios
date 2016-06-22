package cvv

import "time"

type User struct {
	Emails []UserEmail `datastore:,noindex`
	Avatar string      `datastore:,noindex`
	Tokens []UserToken `datastore:,noindex`
	roles  []string    `datastore:,noindex`
}

type UserEmail struct {
	Address  string `datastore:,index`
	Verified bool   `datastore:,noindex`
	Active   bool   `datastore:,noindex`
}

type UserToken struct {
	Service string    `datastore:,index`
	Key     string    `datastore:,index`
	Options string    `datastore:,noindex`
	Expires time.Time `datastore:,noindex`
}

type UserLoginDataWithPassword struct {
	Email        string
	PasswordHash string
}
