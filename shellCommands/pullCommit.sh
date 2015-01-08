git pull
sh shellCommands/runTest.sh
c=`git log -1 --pretty=%B`
echo "Last Commit Msg-------->"
echo $c