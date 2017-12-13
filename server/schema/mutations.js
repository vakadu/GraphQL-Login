const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString
} = graphql;

const UserType = require('./types/user-type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            //resolve(parentValue, args, request){
            resolve(parentValue, { email, password }, req){
                //request is incoming request from express server
                // { email, password }, request is args.email, args.password and request:request
                return AuthService.signup({ email, password, req });
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req){
                const { user } = req;
                req.logout();
                return user;
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req){
                return AuthService.login({ email, password, req });
            }
        }
    }
});

module.exports = mutation;
