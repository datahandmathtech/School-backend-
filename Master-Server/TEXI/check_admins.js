const mongoose = require('mongoose');
const uri = 'mongodb://yatree_admin:Mayank123@ac-n3u3fkt-shard-00-00.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-01.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-02.iuq9w0n.mongodb.net:27017/taxi-fleet?authSource=admin&tls=true';

async function run() {
    await mongoose.connect(uri);
    const User = mongoose.model('UserCheck', new mongoose.Schema({ name: String, mobile: String, role: String, company: mongoose.Schema.Types.ObjectId }), 'users');
    const Company = mongoose.model('CompCheck', new mongoose.Schema({ name: String }), 'companies');
    
    const users = await User.find({ role: { $in: ['Admin', 'SuperAdmin'] } });
    const companies = await Company.find({});
    const compMap = {};
    companies.forEach(c => compMap[c._id.toString()] = c.name);

    const result = users.map(u => ({
        name: u.name,
        role: u.role,
        mobile: u.mobile,
        company: compMap[u.company?.toString()] || 'None'
    }));

    console.log(JSON.stringify(result, null, 2));
    await mongoose.disconnect();
}
run();
