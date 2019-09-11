const graphql = require('graphql')
// const _ = require('lodash')
const axios = require('axios')
const {GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLSchema} = graphql

const CompanyType = new GraphQLObjectType({
    name:"Company",
    fields:{
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
    }
})
const UserType = new GraphQLObjectType({
    name:'User',
    fields:{
        id:{type: GraphQLString},
        firstname:{type: GraphQLString},
        age:{type: GraphQLInt},
        company:{
            type:CompanyType,
            async resolve(parentValue,args){
                let res = await axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                return res.data 
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            async resolve(parentValue,args){
                let res = await  axios.get(`http://localhost:3000/users/${args.id}`)
                return res.data
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})