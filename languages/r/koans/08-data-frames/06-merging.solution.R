people <- data.frame(
  name = c("Ada", "Alan", "Grace", "Edsger"),
  city = c("London", "London", "New York", "Austin"),
  age = c(36, 41, 85, 72)
)

countries <- data.frame(city = c("London", "Austin"), country = c("UK", "USA"))
joined <- merge(people, countries, by = "city")
test_that("an inner join", expect_equal(nrow(joined), 3L))
left <- merge(people, countries, by = "city", all.x = TRUE)
test_that("a left join keeps everyone", expect_equal(nrow(left), 4L))
test_that("with NA where nothing matched", expect_equal(left$country[left$city == "New York"], NA_character_))
more <- rbind(people, data.frame(name = "Barbara", city = "Boston", age = 82))
test_that("rbind adds rows", expect_equal(nrow(more), 5L))
